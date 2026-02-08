#include<stdio.h>

int main(void){
    int a=2;
    int b=6;
    printf("%d %d\n",&a ,&b);
    {
        int a=6;
        printf("%d %d\n");
    }
}