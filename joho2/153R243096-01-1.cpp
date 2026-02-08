#include <stdio.h>

int main(){
    const int N=5;
    int a[N]={10,20,30,40,50};
    
    int *p=&a[0];

   
    for(int i=0;i<N;i++){
        printf("a[%d]=%d ",i,*(p+i));
    }

    printf("\n");
    
}