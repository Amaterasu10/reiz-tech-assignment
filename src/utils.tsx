const arrayPartitioner = <T extends any>(arr: T[], limiter: number): T[][] => {
  const len = arr.length;
  
  if (len < limiter) {
    return [arr];
  }
  
  const numPartitions = Math.ceil(len / limiter);
  const partitions: T[][] = [];
  
  for (let i = 0; i < numPartitions; i++) {
    const startIndex = i * limiter;
    const endIndex = (i + 1) * limiter;
    partitions.push(arr.slice(startIndex, endIndex));
  }
  
  return partitions;
};

export {
  arrayPartitioner
}