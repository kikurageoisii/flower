#include <stdio.h>
#include <stdlib.h> //atoi関数を利用

int main(void){
    int N=30;
    int ans=0;
    char siki[N];
    for(int i=0;i<N;i++){
        scanf("%c",&siki[i]); //charに対しては%cか%s
        if(siki[i]=='\n') break;
        siki[i] = atoi(&siki[i]); //atoi で数値に変換　&を忘れない
        if((siki[i])&&(siki[i]<='9')){
        ans+=siki[i];
        }
        
    }
    printf("%d",ans);
}
