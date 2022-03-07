########################################

# Lab 3
#TNM048 - Information Visualization
#Authors: Afra Farkhooy & Alice Molin

########################################

from textwrap import fill
import tkinter as tk
from tkinter import *
import pandas as pd
from tkinter import filedialog as fd

TK_SILENCE_DEPRECATION=1

window = tk.Tk()
header = window.title('TNM048 - Lab 2, task 3')

canvas_width = 500
canvas_height = 500
norm_pos_x = (canvas_width/2)-1
norm_pos_y = (canvas_height/2)-1

canvas = tk.Canvas(window, width=canvas_width, height=canvas_height, bg="white")

# Sketching grid
for i in range(21):
    x = (i *25)
    canvas.create_line(x,0,x,norm_pos_y*2,width=2, dash=(1,1), fill = "grey") 
    canvas.create_line(0,x,norm_pos_x*2,x, width=2, dash=(1,1), fill = "grey") 

canvas.create_line(-norm_pos_x, norm_pos_y, norm_pos_x*2, norm_pos_y, fill = "black")  # x-axis
canvas.create_line(norm_pos_x, -norm_pos_y, norm_pos_x, norm_pos_y*2, fill = "red")  # y-axis 

# Show ticks on x-axis 
for i in range (21):
    x = (i *25)
    canvas.create_line(x,norm_pos_x,x,norm_pos_y-5,width=2,fill = "black") # (250-245 sätter längden på sträcken)
    canvas.create_text(x,norm_pos_y+5, text = '%d'% (-100 + 10*i), fill = "black", anchor = N)
    
# Show ticks on y-axis 
    y = (i *25)
    canvas.create_line(norm_pos_y,y,norm_pos_y-5,y,width=2,fill = "black") # (250-245 sätter längden på sträcken)
    canvas.create_text(245,y, text = '%d'% (100 - 10*i), fill = "black", anchor = E)

###### Legend ######

# Canvas around legendframe
canvas_legend = tk.Canvas(canvas, width=70, height=70, borderwidth=2, relief='ridge')
canvas_legend.place(x=410, y=25)

# Text
canvas_legend.create_text(30, 40, text= """
   a, baz 
   b, bar
   c, foo
""" , fill="black", font=('Helvetica 12 bold'))

# Blue circle
x = 60
y = 20
color = "blue"
blue = canvas_legend.create_oval(x, y, x + 7, y + 7, fill=color)

#Red circle
x = 60
y = 35
color = "red"
red = canvas_legend.create_oval(x, y, x + 7, y + 7, fill=color)

#Green circle
x = 60
y = 50
color = "green"
green = canvas_legend.create_oval(x, y, x + 7, y + 7, fill=color)

######

# Reading in a file and selecting data
def changeDataBtn(refresh):
    filename = fd.askopenfilename()
    df = pd.read_csv(filename)
    data = df.iloc[:, 0:3].values
    canvas.delete(refresh)
    return data

dots = 0
# Creating the circles 
def create_circle(x, y, type, canvasName): #center coordinates x and y, type in third column, canvas 

    r = 4
    type_color = ""

    x0 = norm_pos_x+(x*2.5) - r
    y0 = norm_pos_y-(y*2.5) - r
    x1 = norm_pos_x+(x*2.5) + r
    y1 = norm_pos_y-(y*2.5) + r

    if (type == "a") : type_color = "blue"
    elif (type == "b") : type_color = "red"
    elif (type == "c") : type_color = "green" 

    elif (type == "baz") : type_color = "blue"
    elif (type == "bar") : type_color = "red" 
    elif (type == "foo") : type_color = "green"

    return canvasName.create_oval(x0, y0, x1, y1, fill = type_color, tag = "current")

# Calling the current dataset and draw circles
def draw_circles():
    dataset = changeDataBtn("current")
    
    # max_x = dataset[:,0].max()
    # max_y = dataset[:,1].max()
    # min_x = dataset[:,0].min()
    # min_y = dataset[:,1].min()

    # max_xaxis = round(max_x/10)*10
    # min_xaxis = round(min_x/10)*10

    # max_yaxis = round(max_y/10)*10
    # min_yaxis = round(min_y/10)*10

    # print(max_x)
    # print(max_xaxis)

    for x in dataset :
        create_circle(x[0], x[1], x[2], canvas)
        
btn =  Button(window, text="Choose dataset", padx = 5, pady = 5, command=draw_circles).pack()

canvas.pack() 
window.mainloop()
