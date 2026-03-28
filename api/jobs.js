const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

function checkAuth(req) {
  const password = req.headers['x-admin-password'];
  return password === ADMIN_PASSWORD;
}

module.exports = async function handler(req, res) {
  // Allow GET without auth (public job listing fallback)
  if (req.method !== 'GET' && !checkAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('posted_date', { ascending: false });

      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const { title, company, location, type, experience, skills, description, salary_range } = req.body;
      const { data, error } = await supabase
        .from('jobs')
        .insert([{
          title, company, location, type, experience,
          skills: Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim()),
          description,
          salary_range: salary_range || null,
          posted_date: new Date().toISOString(),
        }])
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json(data);
    }

    if (req.method === 'PUT') {
      const { id, title, company, location, type, experience, skills, description, salary_range } = req.body;
      const { data, error } = await supabase
        .from('jobs')
        .update({
          title, company, location, type, experience,
          skills: Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim()),
          description,
          salary_range: salary_range || null,
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'DELETE') {
      const { id } = req.body;
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Jobs API error:', error);
    return res.status(500).json({ error: error.message });
  }
};
