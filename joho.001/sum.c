#include<stdio.h>
int main(void){
    int a=0;
    int b=0;
    int c=0;
    int count=0;
    scanf("%d %d %d",&a,&b,&c);
    for (int X=a;X<=b;X++){
        if(c%X==0)
            {count++;};
    }
    printf("%d ",count);
    }
   
   
   
