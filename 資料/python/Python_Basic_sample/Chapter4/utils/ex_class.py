import math

class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        area = self.width * self.height
        return area

    def diagonal(self):
        length = math.sqrt(self.width**2 + self.height**2)
        return length

    def resize(self, width, height):
        self.width = width
        self.height = height
