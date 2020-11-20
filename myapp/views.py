from django.shortcuts import render
from django.http import HttpResponse
from .models import Question,Choice
import random
# Create your views here.
def home(request): 
    questions = list(Question.objects.all())
    questionCounter = Question.objects.all().count()
    choice1 = questions[0].choice_set.all()
    choice2 = questions[1].choice_set.all()
    choice3 = questions[2].choice_set.all()
    choice4 = questions[3].choice_set.all()
    context = {
        'questions_counter': questionCounter,
        'question1' : questions[0],
        'question2' : questions[1],
        'question3' : questions[2],
        'question4' : questions[3], 
        'C1question1': choice1[0],
        'C2question1': choice1[1],
        'C3question1': choice1[2],
        'C4question1': choice1[3],

        'C1question2': choice2[0],
        'C2question2': choice2[1],
        'C3question2': choice2[2],
        'C4question2': choice2[3],

        'C1question3': choice3[0],
        'C2question3': choice3[1],
        'C3question3': choice3[2],
        'C4question3': choice3[3],

        'C1question4': choice4[0],
        'C2question4': choice4[1],
        'C3question4': choice4[2],
        'C4question4': choice4[3],
    }
    return render(request,'myapp/home.html',context)




