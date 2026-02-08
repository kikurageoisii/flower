#include <iostream>
#include <string>

using namespace std;

class Person {
private:
    string name;
    int age;

public:
    // コンストラクタ
    Person(const string& name, int age) : name(name), age(age) {}

    // メンバ関数
    void display() const {
        cout << "Name: " << name << ", Age: " << age << endl;
    }

    // アクセサ（getter）
    string getName() const {
        return name;
    }

    int getAge() const {
        return age;
    }

    // ミューテータ（setter）
    void setName(const string& newName) {
        name = newName;
    }

    void setAge(int newAge) {
        age = newAge;
    }
};

int main() {
    // オブジェクトの生成
    Person person("Taro", 25);

    // メンバ関数の呼び出し
    person.display();

    // 値の取得と設定
    person.setName("Jiro");
    person.setAge(30);

    person.display();

    return 0;
}
