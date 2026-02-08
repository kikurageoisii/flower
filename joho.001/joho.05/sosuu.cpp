#include <iostream>
using namespace std;

int sosu(int x) {
    int k=1;
    for(int n=2;n<x;n++){
        if(x%n==0){
            k=0;
            break;
        }
    }
    return k;
}

int main() {
    int x = 0;
    cin >> x;
    if(x==1){
        cout<<0<<endl;
    }else if(x==2){
        cout<<1<<endl;
        }else{int ans=0;
            for(int i=2;i<=x;i++){
                ans+=sosu(i);
            }   
            cout << ans << endl;
    } 
    return 0; 
}