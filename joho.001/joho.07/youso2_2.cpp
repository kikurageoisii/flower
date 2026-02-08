#include <iostream>

void pow_array(int a[],int n)
{
  for(int i=0;i<n;i++){
    a[i]*=a[i];
  }
}

int main(void)
{
  const int N = 10;
  int data[N];
  
  int i;
  for(i=0; i<N; i++) {
    std::cin >> data[i];
  }

  pow_array(data, N);

  for(i=0; i<N; i++) {
    std::cout << data[i] << " ";
  }
  std::cout << std::endl;

  return 0;
}