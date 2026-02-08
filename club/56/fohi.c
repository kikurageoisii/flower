#include<stdio.h>
int main(void){
    int N,K;
    scanf("%d %d",&N,&K);
    int P[N];
    for(int i=0;i<N;i++){
    scanf("%d",&P[i]);
    }
    int Q[N];
    for(int i=0;i<N;i++){
        scanf("%d",&Q[i]);
    }

    for(int i=0;i<=N;i++){
        for(int j=0; j<=N;j++){
    if(K==P[i]+Q[j]){
        printf("Yes");
    }else 
        printf("No");
    }    
    }
    }
