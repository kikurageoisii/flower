#include <stdio.h>


int main(void){
    char a;
    scanf("%c",&a); //%cは１文字、%sは複数の文字列
    printf("%d %x\n",a,a);//%dで10進法、%xで16進法
}