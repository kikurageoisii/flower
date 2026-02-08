class Person():
    def __init__(self, name, age):
        self.name = name
        self.age = age
        self.weight = []
        self.height = []
    
    def set_weight(self, weight):
        self.weight.extend(weight)
    
    def set_height(self, height):
        self.height.extend(height) 
    
    def describe(self):
        print("名前 : {}, 年齢 : {}".format(self.name, self.age))
        print("{}さんの現在の体重は{}kgです。".format(self.name, self.weight[-1]))
        print("{}さんの現在の身長は{}cmです。".format(self.name, self.height[-1]))
        self.eval_body()
    
    def calc_BMI(self, mode="latest"):
        if mode == "latest":
            bmi = self.weight[-1] / (self.height[-1]/100)**2
            bmi = round(bmi, 1)
        elif mode == "transition":
            bmi = []
            for i in range(len(self.weight)):
                bmi.append(round(self.weight[i] / (self.height[i]/100)**2, 1))
        else:
            print("正しいmodeに設定できていません。")
        return bmi
