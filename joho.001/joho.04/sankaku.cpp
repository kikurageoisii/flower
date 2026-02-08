#include<iostream>
using namespace std;
int main(void){
    int n;
    cin>>n;
    for(int i=0;i<n;i++){
        for(int d=0;d<=i;d++){
            cout<<"*";
        }
        cout<<endl;
    }
}
