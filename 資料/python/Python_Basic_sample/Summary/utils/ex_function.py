def get_float_list(file_path):
    f = open(file_path, mode='r')
    float_list = list(map(float, f.read().split(',')))
    f.close()
    return float_list
