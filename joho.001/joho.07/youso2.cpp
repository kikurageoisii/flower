#include<iostream>
using namespace std;
void read_array (int a[],int n){ //この時点ではconst使ってはいけない
    for(int i=0;i<n;i++){
        cin>>a[i];
    }
}
int main (void){
    int n=10;
    int a[n];
    int ans=0;
    read_array(a,n);
    for(int i=0;i<n;i++){
        ans=a[i]*a[i];
        cout<<ans<<" ";
    }
    cout<<endl;
}