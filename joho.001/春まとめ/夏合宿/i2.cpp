#include<stdio.h>

int main(){
    int n;
    scanf("%d",&n);
    int a[2][n];
    
    for(int i=0;i<n;i++){
        scanf("%d %d",&a[0][i],&a[1][i]);
    }
    for(int i=0;i<n;i++){
        printf("%d %d",a[0][i],a[1][i]);
    }   
}