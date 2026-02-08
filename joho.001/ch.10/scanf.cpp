#include<stdio.h>
int main(void){
    int c=0;
    int n=0;
    scanf("%c %d",&c,&n);
    if(!n){
        printf("%c\n",c);
    }else{
        printf("%x\n",c);
    }
}