#include <stdio.h>

int main(void){
    int a[]={0,10,3,8,7,5,513}; //1万個の配列なら計算量は気にしなくて良い。
    for(int j=6;0<j;j--){
        for(int i=0;i<j;i++){ //iはforの外側に存在しない
            if(a[i]>a[i+1]){
                int temp = a[i+1];
                a[i+1]=a[i];
                a[i]=temp;
            }
        }
    }
    for(int i=0;i<7;i++){
        printf("%d ",a[i]);
    }
}