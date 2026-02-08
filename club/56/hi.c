#include<stdio.h>
int main(void){
    int N,K,ans;
    scanf("%d %d",&N,&K);
    int A[N];
    for(int i=0;i<N;i++){
        scanf("%d",&A[i]);
    if(A[i]%K==0){
        ans=A[i]/K;
        printf("%d ",ans);
    }
 }

}