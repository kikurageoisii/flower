#include<stdio.h>

void gyaku(int l,int r){
    for(int i=r;l<=i;i--){    
        printf("%d ",i);
    }
}

int main(void){
    int n,l,r;
    scanf("%d %d %d",&n,&l,&r);
    for(int i=1;i<l;i++){
        printf("%d ",i);
    }
    gyaku(l,r);
    for(int i=r+1;i<=n;i++){
        printf("%d ",i);
    }
    printf("\n");
}