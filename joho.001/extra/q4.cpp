#include<stdio.h>
int main(void){
    int ans=0;
    for(int x=-10000;;x++){
        if(10*(x+3)-(7-3*x)==1622){
            ans=x;
            break;
        }    
    }
    printf("%d",ans);
}