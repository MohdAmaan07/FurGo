import os
import json
import random
import google.generativeai as genai
from django.conf import settings
from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator


genai.configure(api_key=settings.GEMINI_API_KEY)

# Pet knowledge base
PET_KNOWLEDGE = { ... }  

# Conversation memory
conversation_history = {}

def generate_response(user_message, session_id="default"):
    if session_id not in conversation_history:
        conversation_history[session_id] = []
    conversation_history[session_id].append({"role": "user", "content": user_message})
    
    try:
        prompt = f"""
        You are a helpful assistant specializing in pet animals. 
        Provide concise and to-the-point answers (3-5 sentences) about pet behavior, emotions, and care.
        Avoid long paragraphs or excessive detail. 
        User query: {user_message}
        """
        model = genai.GenerativeModel("gemma-3-27b-it")
        response = model.generate_content(prompt)
        response_content = response.text.strip()
        conversation_history[session_id].append({"role": "assistant", "content": response_content})
        return response_content
    except Exception as e:
        print(f"Error with Gemini API: {e}")
        return search_local_knowledge(user_message, session_id)

def search_local_knowledge(query, session_id="default"):
    query = query.lower()
    greetings = [
        "I'd be happy to help with that! ",
        "Great question! ",
        "Let me share what I know. ",
        "Here's some information that might help: ",
        "I can definitely answer that. "
    ]
    response = random.choice(greetings)
    pet_type = next((pet for pet in PET_KNOWLEDGE.keys() if pet in query), None)
    for category in ["emotions", "behaviors", "care_tips"]:
        if any(word in query for word in category):
            response += f"Here's what I know about {pet_type} {category}:\n"
            selected_items = random.sample(PET_KNOWLEDGE[pet_type][category], min(3, len(PET_KNOWLEDGE[pet_type][category])))
            for item in selected_items:
                response += f"- {item}\n"
            break
    conversation_history[session_id].append({"role": "assistant", "content": response})
    return response

@method_decorator(csrf_exempt, name='dispatch')
class ChatView(View):
    def post(self, request):
        data = json.loads(request.body)
        user_message = data.get("message", "")
        session_id = request.COOKIES.get("session_id", "default")
        if not user_message:
            return JsonResponse({"response": "Please enter a message."})
        response = generate_response(user_message, session_id)
        return JsonResponse({"response": response})
