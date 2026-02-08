#include <iostream>
using namespace std;

int main(void){
    float ans=0;
    int n=0;
    cin>>n;
    float a[n],b[n];
    for(int i=0;i<n;i++){
        cin>>a[i];
    }
    for(int i=0;i<n;i++){
        cin>>b[i];
    }
    for(int i=0;i<n;i++){
        ans+=a[i]*b[i];
    }
    printf("%.2f",ans);
}