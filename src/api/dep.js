import axios from 'axios';

async function Dep(depId) {
  const url = depId ? `/dep/${depId}` : '/dep';
  return await axios.get(url);
}

function Cascade(depList) {
  const cascade = depList.filter(dep => dep._rel.length <= 1);

  function handleCascade(parent, deep = 0) {
    const children = depList.filter(dep =>
      dep._rel.length === parent._rel.length + 1 && dep._rel[deep] === parent._id
    );
    if (children.length > 0) {
      parent.children = children;
      parent.children.forEach(t => handleCascade(t, deep + 1));
    }
  };

  cascade.forEach(t => handleCascade(t));
  return cascade;
}

export {
  Dep,
  Cascade
};