#include<stdio.h>
int main(void){
    int A,m,M,ans=0;
    scanf("%d %d %d",&A,&m,&M);
    
    while(m<M){
       ans=ans+m; 
       m=m+A;
        
        printf("%d %d\n",m,ans);
        }
        printf("%d",ans);
}