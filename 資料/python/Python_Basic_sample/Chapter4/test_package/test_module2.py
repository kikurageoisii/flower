class Train:
    def __init__(self, corp, train_type):
        self.corp = corp
        self.type = train_type

    def simple_timetable(self):
        if self.corp == 'JR' or self.corp == 'jr':
            print('始発：高尾 → 終点：東京')
            train_time = {'local':'1時間30分','express':'1時間'}
            print('乗車時間：'+train_time[self.type])
        elif self.corp == 'Keio' or self.corp == 'keio':
            print('始発：高尾 → 終点：新宿')
            train_time = {'local':'1時間40分','express':'50分'}
            print('乗車時間：'+train_time[self.type])
        elif self.corp == 'Odakyu' or self.corp == 'odakyu':
            print('始発：本厚木 → 終点：新宿')
            train_time = {'local':'1時間20分','express':'50分'}
            print('乗車時間：'+train_time[self.type])
        else:
            print('対応していません')

def train_speed(length, distance, time):
    speed = (length + distance) / time
    return speed
