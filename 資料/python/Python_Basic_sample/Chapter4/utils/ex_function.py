def get_float_list(file_path):
    f = open(file_path, mode='r')
    float_list = list(map(float, f.read().split(',')))
    f.close()
    return float_list

def list_mean(num_list):
    mean = sum(num_list) / len(num_list)
    return mean

def correct_newline(file_path, new_path):
    f = open(file_path, mode='r')
    text = f.read()
    f.close
    text = list(text)
    new_text = []
    for char in text:
        if char == '\n':
            continue
        elif char == '.' :
            new_text.append('.\n')
        elif char == ' ' and new_text[-1] == '.\n':
            continue        
        else:
            new_text.append(char)
    new_text = ''.join(new_text)
    f = open(new_path, mode='w')
    f.write(new_text)
    f.close
