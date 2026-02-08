#include<stdio.h>

void scan_int(int array[],int size){
    for(int i=0;i<size;i++){
        scanf("%d",&array[i]);
    }
}

int main(){
    int N=100;
    int a[N+1];
    scan_int(a,N);
}