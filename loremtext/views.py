from django.http import HttpResponse
from django.template import Template, Context
from django.shortcuts import render_to_response
import loremgen
import simplejson

def hello(request):
    return HttpResponse("Hello a  world")


def lorem(request):
    get = request.GET
    
    if get:
        n = int(get.get(u'n', 5)) 
        if not 0 < n < 100:
            n = 5
        classic = int(get.get(u'classic', 1))
        optype = str(get.get(u'type', 'p'))
        if optype not in ['p', 'w', 'l']:
            optype = 'p'

    else:
        n, classic, optype = 5, True, 'p'
    
    loremText = loremgen.getLorem(n, classic, type=optype)
    return HttpResponse(simplejson.dumps(loremText))
    
def homepage(request):
    get = request.GET
    
    if get:
        n = int(get.get(u'n', 5)) 
        if not 0 < n < 100:
            n = 5
        classic = int(get.get(u'classic', 1))
        op = str(get.get(u'type', 'p'))
        if op not in ['p', 'w', 'l']:
            op = 'p'
    else:
        n, classic, op = 5, True, 'p'
    
    loremText = loremgen.getLorem(n, classic, type=op)
        
    return render_to_response('homepage', {'title': "Home", 'content': loremText, 'classic': classic, 'num':len(loremText), 'type':op })
    
def about(request):
    
    return render_to_response("about", {'title':'About'})
    
def help(request):
    
    return render_to_response("help", {'title':"Help "})
