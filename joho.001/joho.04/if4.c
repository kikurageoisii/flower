#include<stdio.h>
int main (void){
    int N,M;
    scanf("%d %d",&N,&M);
    int a=0,b=0,c=0;
    if(N>0&&M>=2)a=2;
    if(N<=0||M>0)b=3;
    if(N==0&&M!=-3)c=7;
    printf("%d",a+b+c);
}