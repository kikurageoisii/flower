#include <stdio.h>

/*int main(){
    int a=3;
    printf("%p",&a); 
}
*/
/*
void swap(long long xp, long long yp){ //void==空っぽ returnがいらない
    int temp = yp;
    yp=xp;
    xp=temp;

    printf("%p %p\n",&xp,&yp);
    //return;
}
*/

int main (){
    int a=3;
    int b=5;
    printf("%d %p\n",*(&a),&b);
    //swap(a,b);
    printf("%d %d\n",a,b);

}