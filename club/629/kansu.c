#include<stdio.h>

//自乗する函数
double f(double x){
    printf("Hello\n");//数学の関数では、できないこともできる //毎回Helloって叫ぶ
    if(x==0) return 2; //return は　値を返す＋関数を終了する
    return f(x-1)+3;
}

char* hello(double x){
    return "Hello";
}

int main(){
    printf("%f\n",f(3));
    // printf("%s\n",hello(3));
    
}