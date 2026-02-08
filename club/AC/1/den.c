#include<stdio.h>
int main(void){
    int a,b,c,d;
    scanf("%d %d %d %d",&a,&b,&c,&d);
    if((b<d&&d<c)||(c<d&&d<b)){
        printf("Yes");
    }else{
        printf("No");
    }
}