#include <stdio.h>

void scan_table(int *table, int size) {//ポインターを引数として与える
    for(int i=0; i<size; i++) {
       scanf("%d",&table[i]);
    }
}

int sikaku(int* x,int *hako,int h,int w,int tate,int yoko){
    int ans=0;
    /*for(int i=0;i<yoko;i++){
       for(int j=0;j<tate;j++){
            ans+=*(x+(i-1)*h+(j-1)*w);
        }
    }
    */
    return ans;
}

int main(){
    int h,w;
    int x[h][w];
    int q;
    const int n=4;
    int A[n][q];
    const int a=0,b=1,c=2,d=3;
    
    scanf("%d %d",&h,&w);
    scan_table(&x[0][0],h*w);
    scanf("%d",&q);
    scan_table(&A[0][0],n*q);
    
    int hako[h][w];
    int ans=0;
    /*for(int i=0;i<q;i++){
    ans=sikaku(&x[0][0],&hako[0][0],h,w,A[i][c],A[i][d]);
    }
    */
}