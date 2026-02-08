#include<stdio.h>

int main(void){
    double kinri=0.0;
    int gen=0,nen=1;
    scanf("%lf %d",&kinri,&gen);
    int ans=gen;
    while(2*gen==ans){
        ans*=(1+kinri/100);
        nen++;
    }
    printf("%d",nen);
}