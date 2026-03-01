// #region library
// #region functions
// Atomic Typography component for headings.
export const F_Heading = ({
    p_text,
    p_level = 1,
    p_class_name
}: {
    p_text: string,
    p_level?: 1 | 2 | 3,
    p_class_name?: string
}) => {
    // #region objects
    const Tag = `h${p_level}` as any;
    const styles = p_level === 1 ? "text-3xl font-bold" : p_level === 2 ? "text-xl font-semibold" : "text-lg";
    // #endregion

    return <Tag className={`${styles} ${p_class_name || ''}`}>{p_text}</Tag>;
};
// #endregion
