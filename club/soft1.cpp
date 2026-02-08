#include<iostream>
using namespace std;

int f(int x){
    return x^2 + 3 * x + 2;
}

//g(x) = 2 * g(x - 1) + 5 * g(x - 2) (g(0) = 0, g(1) = 1)
int g(int x){
    if(x==0){
        return 0;
    }else if(x==1){
        return 1;
    }else{
        return 2 * g(x - 1) + 5 * g(x - 2);
    }
}
int h(int x){
    return f(2 * x - 4) + g(x + 1);
}
int main(void){
    int n=0;
    cin>>n;
    cout<<f(n)<<" "<<g(n)<<" "<<h(n);
}