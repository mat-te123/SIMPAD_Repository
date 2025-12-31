function AddText({ block_content = {}, onChange }) {
  return (
    <div className="w-full">
      <textarea
        placeholder="Add a paragraph here"
        className="w-full text-lg p-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E6F2F2] resize-none"
        rows={8}
        value={block_content?.text || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export { AddText };