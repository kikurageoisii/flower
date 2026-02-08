#include<stdio.h>
int main(void){
    int a,b;
    int d=0;
    char o;
    scanf("%d %c %d",&a,&o,&b);
    if(o=='+'){
        d=a+b;
    }else if(o=='-'){
        d=a-b;
    }else if (o=='*'){
        d=a*b;
    }else if(o=='%'){
        d=a%b;
    }else if(o=='/'){
        d=a/b;
    }
    printf("%d",d);
}
