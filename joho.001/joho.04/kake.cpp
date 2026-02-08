#include<iostream>
#include<iomanip>
using namespace std;
int main (void){
    int n,m;
    cin>>n>>m;
    for(int i=n;i<m+n;i++){
        for(int d=1;d<=m;d++){
            printf("%3d ",i*d);
        }
        cout<<endl;
    }
}