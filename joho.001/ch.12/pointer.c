#include <stdio.h>

void jusyohyouji(int*  a){
    printf("%p\n",a);
}

void nisenojusyohyouji(int a){
    printf("%p\n",&a);
}

int main(void){
    //アドレス=住所
    int a=0;
    printf("%p\n",&a);
    nisenojusyohyouji(a);
    jusyohyouji(&a);
}