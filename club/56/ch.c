#include<stdio.h>
int main(void){
    int A,B,i;
    scanf("%d %d",&A, &B);
    for(i=B;0<i;i--){
        if(A%i==0){
            if(B%i==0)break;
        }
    }
    printf("%d",i);
    
    
}