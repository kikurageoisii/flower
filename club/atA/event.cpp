#include <iostream>
#include <vector>
using namespace std;

int main (void){
    int d,n,L,R;
    cin>>d>>n;
    vector<int> D(d,0);
    for(int i=0;i<n;i++){
        cin>>L>>R;
        for(int j=L;j<R;j++){
            
            D[j]++;
            
        }
    }
    for(int e=0;e<d;e++){
        cout<<D[e]<<endl;
    }
}