#include <iostream>
using namespace std;

int main(void){
    int n=10;
    int a[n],b[n];
    for(int i=0 ;i<n;i++){
        cin>>a[i];
    }
    for(int i=0 ;i<n;i++){
        cin>>b[i];
    }
    for(int i=0;i<n;i++){
        for(int j=0;j<n;j++){
            printf("%3d ",a[i]*b[j]);
        }
        cout<<endl;
    }
}