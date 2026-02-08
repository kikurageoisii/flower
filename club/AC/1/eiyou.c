#include<stdio.h>

int main(void){
    int n,m;
    scanf("%d %d",&n,&m);
    
    int a[m+1];
    for(int i=0;i<m;i++){
        scanf("%d ",&a[i]);
    }
   
    int x[n][m];
     for(int i=0;i<n;i++){
        for(int j=0;j<m;j++){
            scanf("%d ",&x[i][j]);
        }
    }

    int sum[m];
    for(int i=0;i<m;i++){
        for(int j=0;j<n;j++){
            sum[i]+=x[j][i];
        }
    }
    
    for(int i=0;i<m;i++){
        if();
    }
}