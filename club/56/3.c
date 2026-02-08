#include<stdio.h>
int main(void){
    int N,a=0,b=0,c=0;
    scanf("%d",&N);
   
        for(c=0;c<=N;c++){
            for(b=0;b<=N;b++)
                for(a=0;a<=N;a++)

        if(a+b+c<=N){
            printf("%d%d%d\n",c,b,a);
            }
         
   }
}
