#include<stdio.h>
int main(void){
    int M,N,i,b=0,d;
    scanf("M:%d N:%d",&M,&N);
    for(i=0;i<N;i++){
        int a;
        scanf("%d",&a);
        b=a+b;
    }
   d=M-b;
   printf("%d",d); 
}
