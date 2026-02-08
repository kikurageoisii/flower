#include <iostream>

void adjust_angle(int& n){ //int& n→kansuu(n),int* n→&n
    if(0>n){
        while(n<0){
            n+=360;
            }
     }else if(n>359){
        while(n>359){
        n-=360;
        }
     }
    //voidなのでreturnはいらない。入れ替えているだけ
}

int main()
{
    int n;
    std::cin >> n;

    adjust_angle(n);
    std::cout << n << std::endl;

    return 0;
}
