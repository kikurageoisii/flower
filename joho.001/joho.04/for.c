#include<stdio.h>
int main(void){
    int N,M;
    scanf("%d %d",&N,&M);
    for(int i=-1;i<N;i++){
        printf("%d ",M);
        M+=1;
    }
}