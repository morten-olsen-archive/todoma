const createQuery = <T extends {[name: string]: any}>(items: T[]) => {
  const query = {
    where: (obj: Partial<T>) => {
      const newItems = items.filter((item) => {
        const isMatch = !Object.entries(obj).find(([name, value]) => {
          let targetValue = value;
          if (value && value._type === 'isNull') {
            targetValue = null;
          }
          if (value && value._type === 'in') {
            return !value._value.includes(item[name]);
          }
          const hasCorrectProp = item[name] === targetValue; 
          return !hasCorrectProp;
        });
        return isMatch;
      });
      return createQuery(newItems);
    },
    getManyAndCount: () => {
      return Promise.resolve([items, items.length]);
    },
  }
  return query;
}

export default createQuery;
